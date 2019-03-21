using System;
using System.Collections.Generic;
using System.Reflection;
using CommandLine;
using CommandLine.Text;

namespace SalaryAssignment
{
    class Program
    {
        static void Main(string[] args)
        {
            var parsedArguments = Parser.Default.ParseArguments<Options>(args);
            parsedArguments.WithParsed(options => Run(options, parsedArguments));
#if DEBUG
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
#endif
        }
        private static void Run(Options options, ParserResult<Options> parsedArguments)
        {
            if (options.Help)
            {
                Console.WriteLine(HelpText.AutoBuild(parsedArguments, null, null));
                return;
            }
            if (options.Version)
            {
                Console.WriteLine(Assembly.GetEntryAssembly().GetCustomAttribute<AssemblyInformationalVersionAttribute>().InformationalVersion);
                return;
            }
            var generator = new SalaryGenerator(options);
        }
    }
}
