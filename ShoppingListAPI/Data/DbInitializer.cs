using ShoppingListAPI.Models;

namespace ShoppingListAPI.Data
{
    public static class DbInitializer
    {
        public static void Seed(AppDbContext context)
        {
           
            if (!context.Categories.Any())
            {
                var categories = new List<Category>
                {
                    new Category { Name = "מוצרי נקיון" },
                    new Category { Name = "גבינות" },
                    new Category { Name = "ירקות ופירות" },
                    new Category { Name = "בשר ודגים" },
                    new Category { Name = "מאפים" }
                };

                context.Categories.AddRange(categories);
                context.SaveChanges();
            }
        }
    }
}
