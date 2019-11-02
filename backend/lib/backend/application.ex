defmodule Backend.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false
  use Application
  require Logger


  def start(_type, _args) do
    children = [
      {Plug.Cowboy, scheme: :http, plug: Backend.HelloWorldPlug, options: [port: 8080]}
      # Starts a worker by calling: Backend.Worker.start_link(arg)
      # {Backend.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Backend.Supervisor]

    Logger.info("Starting application...")
    Supervisor.start_link(children, opts)
  end
end
