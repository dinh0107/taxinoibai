﻿using taxinoibai.Models;
using System.Collections.Generic;

namespace taxinoibai.ViewModel
{
    public class ListContactViewModel
    {
        public PagedList.IPagedList<Contact> Contacts { get; set; }
        public string Name { get; set; }
    }
}
