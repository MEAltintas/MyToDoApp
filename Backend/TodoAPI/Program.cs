using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args); 

builder.Services.AddControllers(); 


builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))); //appsettings.json'na eklendi 
builder.Services.AddCors(options =>
{
   
    options.AddPolicy("AllowReact", builder =>
        builder.AllowAnyOrigin() 
               .AllowAnyMethod() 
               .AllowAnyHeader());
});

var app = builder.Build(); // Web uygulamasýný oluþturur.

app.UseCors("AllowReact");
app.UseHttpsRedirection(); 
app.MapControllers(); 

app.Run(); // Uygulamayý çalýþtýrýr.