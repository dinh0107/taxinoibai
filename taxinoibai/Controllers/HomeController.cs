using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using taxinoibai.DAL;
using taxinoibai.Models;
using taxinoibai.ViewModel;

namespace taxinoibai.Controllers
{

    public class HomeController : Controller
    {
        private readonly UnitOfWork _unitOfWork = new UnitOfWork();
        private static string Email => WebConfigurationManager.AppSettings["email"];
        private static string Password => WebConfigurationManager.AppSettings["password"];
        public ConfigSite ConfigSite => (ConfigSite)HttpContext.Application["ConfigSite"];

        private IEnumerable<ArticleCategory> ArticleCategories() =>
            _unitOfWork.ArticleCategoryRepository.Get(a => a.CategoryActive, q => q.OrderBy(a => a.CategorySort));

        public ActionResult Index()
        {
            var model = new HomeViewModel
            {
                Bookings = GetFakeBookings(),
                Banners = _unitOfWork.BannerRepository.Get(b => b.Active, q => q.OrderBy(b => b.Sort)),
                Articles = _unitOfWork.ArticleRepository.Get(a => a.Active && a.Home, q => q.OrderByDescending(a => a.CreateDate)),
            };
            return View(model);
        }

        [ChildActionOnly]
        public PartialViewResult Header()
        {
            var model = new HeaderViewModel
            {
                ArticleCategories = ArticleCategories().Where(a => a.ShowMenu),
            };
            return PartialView(model);
        
        }

        public PartialViewResult Form()
        {
            return PartialView();
        }


        [ChildActionOnly]
        public PartialViewResult Footer()
        {
            var model = new FooterViewModel
            {
                ArticleCategories = ArticleCategories(),
            };
            return PartialView(model);
        }


        [Route("news/{url}", Order = 0)]
        public ActionResult ArticleCategory(string url, int? page)
        {
            var category = _unitOfWork.ArticleCategoryRepository.GetQuery(a => a.CategoryActive && a.Url == url).FirstOrDefault();
            if (category == null)
            {
                return RedirectToAction("Index");
            }

            var articles = _unitOfWork.ArticleRepository.GetQuery(
                a => a.Active && (a.ArticleCategoryId == category.Id || a.ArticleCategory.ParentId == category.Id),
                q => q.OrderByDescending(a => a.CreateDate));
            var pageNumber = page ?? 1;

            if (articles.Count() == 1)
            {
                var fi = articles.First();
                return RedirectToAction("ArticleDetail", new { url = fi.Url });
            }
            var model = new ArticleCategoryViewModel
            {
                Category = category,
                Articles = articles.ToPagedList(pageNumber, 11),
                Categories = ArticleCategories(),
            };

            if (category.ParentId != null)
            {
                model.RootCategory = _unitOfWork.ArticleCategoryRepository.GetById(category.ParentId);
            }
            return View(model);
        }
        [Route("{url}.html")]
        public ActionResult ArticleDetail(string url, string view = "")
        {
            var article = _unitOfWork.ArticleRepository.GetQuery(a => a.Url == url).FirstOrDefault();
            if (article == null)
            {
                return RedirectToActionPermanent("Index", "Home");
            }
            if (view == "")
            {
                article.View++;
                _unitOfWork.ArticleRepository.Update(article);
                _unitOfWork.Save();
            }

            var model = new ArticleViewModel
            {
                Article = article,
                Articles = _unitOfWork.ArticleRepository.GetQuery(a => a.Active && (a.ArticleCategoryId == article.ArticleCategoryId && a.Id != article.Id)).OrderByDescending(a => a.CreateDate).Take(6)
            };
            if (article.ArticleCategory.ParentId != null)
            {
                model.RootCategory = _unitOfWork.ArticleCategoryRepository.GetById(article.ArticleCategory.ParentId);
            }
            return View(model);
        }

        public PartialViewResult ArticleHot()
        {
            var articles = _unitOfWork.ArticleRepository
                .GetQuery(a => a.Active || a.View >= 100,
                          o => o.OrderByDescending(a => a.CreateDate))
                .ToList();

            var model = new NavArticleViewModel
            {
                Articles = articles
            };

            return PartialView(model);

        }

        [Route("lien-he")]
        public ActionResult Contact()
        {
            return View();
        }
        public List<Booking> GetFakeBookings()
        {
            return new List<Booking>
            {
                new Booking { CustomerName = "Ng Trang", Phone = "039.xxx.199", Service = "vừa đặt xe đi Nội Bài", Price = "780.000đ" },
                new Booking { CustomerName = "Phượng", Phone = "0912.xxx.652", Service = "vừa đặt xe đi Nội Bài", Price = "1.210.000đ" },
                new Booking { CustomerName = "Đinh Uyên", Phone = "035.xxx.122", Service = "vừa đặt xe đi Nội Bài", Price = "2.230.000đ" },
                new Booking { CustomerName = "Linh Chi", Phone = "035.xxx.096", Service = "vừa đặt xe đi Nội Bài", Price = "1.100.000đ" },
                new Booking { CustomerName = "Minh Khang", Phone = "0905.xxx.345", Service = "vừa đặt xe đi Nội Bài", Price = "950.000đ" },
                new Booking { CustomerName = "Thu Hà", Phone = "0987.xxx.543", Service = "vừa đặt xe đi Nội Bài", Price = "1.450.000đ" },
                new Booking { CustomerName = "Quốc Bảo", Phone = "0913.xxx.876", Service = "vừa đặt xe đi Nội Bài", Price = "870.000đ" },
                new Booking { CustomerName = "Khánh Vy", Phone = "0932.xxx.333", Service = "vừa đặt xe đi Nội Bài", Price = "1.980.000đ" },
                new Booking { CustomerName = "Anh Tuấn", Phone = "0974.xxx.765", Service = "vừa đặt xe đi Nội Bài", Price = "2.050.000đ" },
                new Booking { CustomerName = "Ngọc Hân", Phone = "0922.xxx.888", Service = "vừa đặt xe đi Nội Bài", Price = "1.320.000đ" }
            };
        }
    }
}