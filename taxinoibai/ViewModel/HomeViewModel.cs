using taxinoibai.Models;
using PagedList;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace taxinoibai.ViewModel
{
    public class HomeViewModel
    {
        public IEnumerable<Banner> Banners { get; set; }
        public IEnumerable<Article> Articles { get; set; }
        public List<Booking> Bookings { get; set; }
    }
    public class Booking
    {
        public string CustomerName { get; set; }
        public string Phone { get; set; }
        public string Service { get; set; }
        public string Price { get; set; } // Để string cho dễ hiển thị 780.000đ
    }

    public class ServiceCarViewModel
    {
        public IEnumerable<Banner> Banners { get; set; }
        public IEnumerable<Article> Articles { get; set; }
        public IEnumerable<ArticleCategory> Services { get; set; }
    }

    public class HeaderViewModel
    {
        public IEnumerable<ArticleCategory> ArticleCategories { get; set; }
        public Banner Banner { get; set; }
    }

    public class FooterViewModel
    {
        public Contact Contact { get; set; }
        public IEnumerable<Article> Articles { get; set; }
        public IEnumerable<ArticleCategory> ArticleCategories { get; set; }
    }

    public class AllArticleViewModel
    {
        public IPagedList<Article> Articles { get; set; }
        public IEnumerable<ArticleCategory> Categories { get; set; }
    }

    public class ArticleCategoryViewModel
    {
        public ArticleCategory RootCategory { get; set; }
        public ArticleCategory Category { get; set; }
        public IPagedList<Article> Articles { get; set; }
        public IEnumerable<ArticleCategory> Categories { get; set; }
    }
    public class NavArticleViewModel
    {
        public IEnumerable<Article> Articles { get; set; }

    }
    public class ArticleViewModel
    {
        public Article Article { get; set; }
        public IEnumerable<Article> Articles { get; set; }
        public ArticleCategory RootCategory { get; set; }
    }
    public class ArticleDetailViewModel
    {
        public Article Article { get; set; }
        public IEnumerable<Article> Articles { get; set; }
        public IEnumerable<Article> PostNews { get; set; }
    }

    public class ArticleSearchViewModel
    {
        public string Keywords { get; set; }
        public IPagedList<Article> Articles { get; set; }
        public IEnumerable<ArticleCategory> Categories { get; set; }
    }

    public class MenuArticleViewModel
    {
        public IEnumerable<Article> Articles { get; set; }
        public IEnumerable<ArticleCategory> ArticleCategories { get; set; }
    }


}
