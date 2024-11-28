using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController] 
[Route("api/[controller]")] 
//Controller Tanımı
public class TodoController : ControllerBase 
{

    private readonly TodoContext _context;


    public TodoController(TodoContext context) 
    {
       
        _context = context;
    }

    // Get=>Kaynak isteme, Tüm todoları getir
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
    {
        return await _context.Todos.ToListAsync(); 
    }

    // ID'ye göre todo getir
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Todo>> GetTodo(int id)
    {
        var todo = await _context.Todos.FindAsync(id); 
        if (todo == null) { 
            return NotFound(); //404 
        } 
        return todo;
    }

    // Post işlemi=>Kaynak oluşturma, Yeni todo ekle
    [HttpPost]
    public async Task<ActionResult<Todo>> CreateTodo(Todo todo)
    {
        todo.CreatedDate = DateTime.Now; 
        _context.Todos.Add(todo); 
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);  
    }

    //Put işlemi=>güncelleme yapma, Todo güncelle
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateTodo(int id, Todo todo)
    {
        if (id != todo.Id) { 
            return BadRequest(); //400 
        }

        todo.UpdatedDate = DateTime.Now; 
        _context.Entry(todo).State = EntityState.Modified; 

        try
        {
            await _context.SaveChangesAsync(); 
        }
        catch (DbUpdateConcurrencyException) 
        {
            if (!TodoExists(id)) 
            { 
                return NotFound(); // 404 
            } 
            throw; 
        }

        return NoContent(); //204 
    }

    // Todo sil
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteTodo(int id)
    {
        var todo = await _context.Todos.FindAsync(id); 
        if (todo == null)
        { 
            return NotFound(); 
        }

        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync(); 

        return NoContent();
    }

    // Verilen ID'ye sahip bir görevin var olup olmadığını kontrol eden yardımcı metot.
    private bool TodoExists(int id)
    {
        return _context.Todos.Any(e => e.Id == id); 
    }
}