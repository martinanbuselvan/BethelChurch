using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BethelChurchAPI.Models
{
    public class Member
    {
        public int id { get; set; }
        public int CardNumber { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int MobileNumber { get; set; }
        public int Pincode { get; set; }

    }
}
