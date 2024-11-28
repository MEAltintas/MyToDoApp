using Microsoft.EntityFrameworkCore;


//Entity Framework Core(EF Core), .net nesneleri kullanarak bir veri tabanıyla çalışmasına olanak sağlar
public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options)
    {
       
    }

    // Veritabanında "Todos" adında bir tablo oluşturur. 
    public DbSet<Todo> Todos { get; set; }
 }