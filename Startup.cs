using Graphql_Dotnet_React_Relay.Domain.Model;
using Graphql_Dotnet_React_Relay.Domain.Service;
using Graphql_Dotnet_React_Relay.Graphql;
using HotChocolate;
using HotChocolate.AspNetCore;
using HotChocolate.Subscriptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Graphql_Dotnet_React_Relay
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IBookService, BookService>();

            services.AddInMemorySubscriptionProvider();

            services.AddGraphQL(sp =>
                SchemaBuilder.New()
                .AddServices(sp)
                .AddQueryType<Query>()
                .AddMutationType<Mutation>()
                .AddSubscriptionType<Subscription>()
                .AddType<Book>()
                .AddInputObjectType<AddBookInput>()
                .AddInputObjectType<UpdateBookInput>()
                .Create()
                );

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app
                .UseCors(b =>
                {
                    b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                })
                .UseWebSockets()
                .UseRouting()
                .UseGraphQL("/graphql")
                .UsePlayground("/graphql");
        }
    }
}
