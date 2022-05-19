using MongoDB.Bson;

namespace AuctionMicroService.Helpers
{
    public class ObjectIdHelpers
    {
        public List<ObjectId> GetListObjectIdsFromStrings(List<string> stringIds)
        {
            List<ObjectId> result = new List<ObjectId>();   
            for (int i = 0; i < stringIds.Count; i++)
            {
                result.Add(new ObjectId(stringIds[i])); 
            }
            return result;
        }

    }
}
