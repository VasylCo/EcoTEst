using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using EcoTEst.Models;

namespace EcoTEst.Controllers
{
    public class TestController : Controller
    {
        EcoTestDbEntities1 db = new EcoTestDbEntities1();

        // GET: Test
        [HttpGet]
        public ActionResult Index()
        
        {
           
           ViewBag.Test = db.Questions.ToList();
                     
           return View();
        }

        [HttpPost]
        public string Result(string result)
        {
            if (result==null)
            {
                ViewBag.Result = "no result";
            }

            ViewBag.Result = result;
            return result;
        }
    }
}