public class Todo
{
    //Model oluşturuldu ve Controller içerisinde kullanılacak
    public int Id { get; set; } // Her görev için benzersiz bir kimlik (Primary Key).
    public string Title { get; set; } // Görevin başlığı.
    public string Description { get; set; } // Görevin açıklaması
    public bool IsCompleted { get; set; } // Görevin tamamlanıp tamamlanmadığını belirtir
    public DateTime CreatedDate { get; set; } // Görevin oluşturulduğu tarih.
    public DateTime? UpdatedDate { get; set; } // Görevin son güncellenme tarihi (nullable, güncellenmediyse boş kalabilir).

}