using System;

namespace dotnet_api
{
    public class Company
    {
        public Guid companyId { get; set; }

        public string name { get; set; }

        public string description { get; set; }

        public string[] tags { get; set; }

        public string userId { get; set; }
    }
}
