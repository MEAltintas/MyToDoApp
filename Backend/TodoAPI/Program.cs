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

var app = builder.Build(); // Web uygulamas�n� olu�turur.

app.UseCors("AllowReact");
app.UseHttpsRedirection(); 
app.MapControllers(); 

app.Run(); // Uygulamay� �al��t�r�r.