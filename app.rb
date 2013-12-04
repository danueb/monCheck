require 'bundler'
Bundler.require

class Moncheck < Sinatra::Base
  configure do
    set :assets, (Sprockets::Environment.new { |env|
      env.append_path(settings.root + "/assets/images")
      env.append_path(settings.root + "/assets/javascripts")
      env.append_path(settings.root + "/assets/stylesheets")

      if ENV["RACK_ENV"] == "production"
        env.js_compressor  = YUI::JavaScriptCompressor.new
        env.css_compressor = YUI::CssCompressor.new
      end
    })
  end

  configure :development do
    env_file = File.join(settings.root, 'config.yml')
    if File.exists?(env_file)
      YAML.load(File.open(env_file))['development'].each do |key, value|
        ENV[key.to_s] = value
      end
    end
  end

  def authorized?
    @auth ||=  Rack::Auth::Basic::Request.new(request.env)
    @auth.provided? && @auth.basic? && @auth.credentials && @auth.credentials == [ENV['username'],ENV['password']]
  end

  def protected!
    unless authorized?
      response['WWW-Authenticate'] = %(Basic realm="Restricted Area")
      throw(:halt, [401, "Nope, nothing to see here.\n"])
    end
  end

  ## Models ##
  DataMapper.setup(:default, ENV['DATABASE_URL'] || "postgres://localhost/moncheck_dev")

  # here be models

  DataMapper.finalize.auto_upgrade!

  ## Routing ##
  get '/' do
    @mons ||= File.read(settings.root + '/assets/javascripts/mons.json')
    erb :index
  end

  get '/admin' do
    protected!
    erb :admin
  end

  get "/assets/scripts.js" do
    content_type("application/javascript")
    settings.assets["scripts.js"]
  end

  get "/assets/screen.css" do
    content_type("text/css")
    settings.assets["screen.css"]
  end

  %w{jpg png}.each do |format|
    get "/assets/:image.#{format}" do |image|
      content_type("image/#{format}")
      settings.assets["#{image}.#{format}"]
    end
  end
end
