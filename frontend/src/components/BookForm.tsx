import { useEffect, useState } from 'react';
import type { Book } from '../types/Book';

// BookForm.tsx
// This component renders the form used to add or edit a book.
// It handles user input and submits data to the parent component.

type BookFormProps = {
  book: Book;
  onSave: (book: Book) => void;
  onCancel: () => void;
};

function BookForm({ book, onSave, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState<Book>(book);

  useEffect(() => {
    setFormData(book);
  }, [book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === 'bookId' || name === 'pageCount' || name === 'price'
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body shadow-sm">
      <h3>{formData.bookId === 0 ? 'Add Book' : 'Edit Book'}</h3>

      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="author"
            className="form-control"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="publisher"
            className="form-control"
            placeholder="Publisher"
            value={formData.publisher}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            name="isbn"
            className="form-control"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Classification</label>
          <input
            type="text"
            name="classification"
            className="form-control"
            value={formData.classification}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Pages</label>
          <input
            type="number"
            name="pageCount"
            className="form-control"
            value={formData.pageCount || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Price ($)</label>
          <input
            type="number"
            step="0.01"
            name="price"
            className="form-control"
            value={formData.price || ''}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mt-3 d-flex justify-content-end gap-2">
        <button type="submit" className="btn btn-success">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default BookForm;
