using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StashAwayStatistics.Models
{
    public class MultuCurrencyValue
    {
        public float RM { get; set; }
        public float SGD { get; set; }
    }

    public class Data
    {
        public DateTime Date { get; set; }
        public MultuCurrencyValue Value { get; set; }
    }
}
