namespace API.SignalR
{
    public class PresenceTracker
    {
        private static readonly Dictionary<string, List<string>> OnLineUsers = [];

        public Task<bool> UserConnected(string username, string connectionId)
        {
           var isOnline = false;
            lock (OnLineUsers)
            {
                if (OnLineUsers.ContainsKey(username))
                {
                    OnLineUsers[username].Add(connectionId);
                }
                else
                {
                    OnLineUsers.Add(username, [connectionId]);
                    isOnline = true;
                }
            }

            return Task.FromResult(isOnline);
        }

        public Task <bool> UserDisconnected(string username, string connectionId)
        {
            var isOffline = false;
            lock (OnLineUsers)
            {
                if (!OnLineUsers.ContainsKey(username)) return Task.FromResult(isOffline);

                OnLineUsers[(username)].Remove(connectionId);

                if (OnLineUsers[username].Count == 0)
                {
                    OnLineUsers.Remove(username);
                    isOffline = true;
                }
            }

            return Task.FromResult(isOffline);
        }

        public Task<string[]> GetOnlineUsers()
        {
            string[] onlineUsers;
            lock (OnLineUsers)
            {
                onlineUsers = OnLineUsers.OrderBy(k => k.Key).Select(k => k.Key).ToArray();
            }

            return Task.FromResult(onlineUsers);
        }

        public static Task<List<string>> GetConnectionsForUser(string username)
        {
            List<string> connectionIds;

            if (OnLineUsers.TryGetValue(username, out var connections))
            {
                lock (connections)
                {
                    connectionIds = connections.ToList();
                }
            }
            else
            {
                connectionIds = [];
            }

            return Task.FromResult(connectionIds);
        }
    }
}
