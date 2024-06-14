using System;
using Application.Core;

namespace Application.Profiles
{
    public class UserActivityParams : PagingParams
    {
        public bool IsHost { get; set; }
        public bool IsFuture { get; set; } = true;
    }
}