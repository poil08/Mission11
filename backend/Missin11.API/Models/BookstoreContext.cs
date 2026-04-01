using Microsoft.EntityFrameworkCore;

namespace Mission11.API.Models;

// BookstoreContext.cs
// This class configures the connection to the database.
// It provides access to the Books table using Entity Framework.

public class BookstoreContext : DbContext
{
    public BookstoreContext(DbContextOptions<BookstoreContext> options)
        : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }
}