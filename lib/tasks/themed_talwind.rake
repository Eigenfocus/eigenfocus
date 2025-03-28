
namespace :themed_tailwindcss do
  desc "Build all themes using TailwindCSS"
  task build: :environment do |_, args|
    debug = args.extras.include?("debug")

    TailwindTheme.all.each do |theme|
      command = ThemedTailwindcssCommands.compile_command(theme_key: theme.key, debug: debug)
      puts command.inspect if args.extras.include?("verbose")
      system(*command, exception: true)
    end
  end

  desc "Watch and build all themes using Tailwind CSS"
  task watch: :environment do |_, args|
    debug = args.extras.include?("debug")
    poll = args.extras.include?("poll")
    always = args.extras.include?("always")

    TailwindTheme.all.each do |theme|
      fork do
        command = ThemedTailwindcssCommands.watch_command(theme_key: theme.key, always: always, debug: debug, poll: poll)
        puts command.inspect if args.extras.include?("verbose")
        system(*command)
      rescue Interrupt
        # Do nothing
      end
    end

    Process.waitall
  rescue Interrupt
    puts "Received interrupt, exiting themed_tailwindcss:watch" if args.extras.include?("verbose")
  end
end

Rake::Task["assets:precompile"].enhance([ "themed_tailwindcss:build" ])

if Rake::Task.task_defined?("test:prepare")
  Rake::Task["test:prepare"].enhance([ "themed_tailwindcss:build" ])
elsif Rake::Task.task_defined?("spec:prepare")
  Rake::Task["spec:prepare"].enhance([ "themed_tailwindcss:build" ])
elsif Rake::Task.task_defined?("db:test:prepare")
  Rake::Task["db:test:prepare"].enhance([ "themed_tailwindcss:build" ])
end
