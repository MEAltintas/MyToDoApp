import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]); // Görev listesini (todos) tutmak için bir state tanımlıyoruz.
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });  // Yeni görev eklemek için bir state tanımlıyoruz (title ve description bilgilerini içeriyor).
  const [loading, setLoading] = useState(false);  // Veri yükleme durumunu kontrol eden bir state tanımlıyoruz.

  const API_URL = 'https://localhost:7268/api/todo'; // API URL'sini belirtiyoruz. Bu, görevleri alıp göndereceğimiz backend'in adresi.

  // Bileşen yüklendiğinde bir kez çalışacak olan `useEffect` ile fetchTodos fonksiyonunu çağırıyoruz.
  useEffect(() => {
    fetchTodos();
  }, []); // Boş bağımlılık dizisi: Sadece bir kez çalışır.

   // Görev listesini API'den almak için bir fonksiyon tanımlıyoruz.
  const fetchTodos = async () => {
    try {
      setLoading(true); // Yüklenme durumunu başlatıyoruz.
      const response = await fetch(API_URL); // API'ye GET isteği gönderiyoruz.
      const data = await response.json(); // Gelen yanıtı JSON formatına çeviriyoruz.
      setTodos(data); // Görev listesini state'e kaydediyoruz.
    } catch (error) {
      toast.error('Todos yüklenirken hata oluştu!'); //buralardaki toast React Toastify tarafından sağlanan varsayılan stillerle gösterir
    } finally {
      setLoading(false); // Yükleme durumunu kapatıyoruz.
    }
  };

  // Yeni bir görev eklemek için kullanılan fonksiyon.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Formun varsayılan davranışını (sayfa yenileme) engelliyoruz.
    if (!newTodo.title.trim()) {
      toast.warn('Başlık boş olamaz!');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST', // POST isteği ile yeni bir görev ekliyoruz.
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({

          // Kullanıcının girdiği title ve description bilgilerini alıyoruz.
          title: newTodo.title, 
          description: newTodo.description,
          isCompleted: false, // Varsayılan olarak tamamlanmamış olarak ayarlıyoruz.
        }),
      });

      if (response.ok) {
        toast.success('Todo başarıyla eklendi!');
        setNewTodo({ title: '', description: '' }); // Formu sıfırlıyoruz.
        fetchTodos(); // Görev listesini tekrar yüklüyoruz.
      }
    } catch (error) {
      toast.error('Todo eklenirken hata oluştu!');
    }
  };

   // Bir görevin tamamlanma durumunu değiştiren fonksiyon.
  const toggleTodo = async (todo) => {
    try {
      const response = await fetch(`${API_URL}/${todo.id}`, {
        method: 'PUT', // PUT isteği ile mevcut görevi güncelliyoruz.
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...todo,
          isCompleted: !todo.isCompleted,
        }),
      });

      if (response.ok) {
        fetchTodos();
        toast.success('Todo güncellendi!');
      }
    } catch (error) {
      toast.error('Todo güncellenirken hata oluştu!');
    }
  };

   // Bir görevi silmek için kullanılan fonksiyon.
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE', // DELETE isteği ile görevi siliyoruz.
      });

      if (response.ok) {
        fetchTodos();
        toast.success('Todo silindi!');
      }
    } catch (error) {
      toast.error('Todo silinirken hata oluştu!');
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Todo App</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Başlık"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Açıklama"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="form-input"
          />
        </div>
        <button type="submit" className="btn-submit">Todo Ekle</button>
      </form>

      {loading ? (
        <div className="loading">Yükleniyor...</div>
      ) : (
        <div className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => toggleTodo(todo)}
                  className="todo-checkbox"
                />
                <div>
                  <h3 className="todo-title">{todo.title}</h3>
                  {todo.description && <p className="todo-description">{todo.description}</p>}
                </div>
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="btn-delete">Sil</button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
