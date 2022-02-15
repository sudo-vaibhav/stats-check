# Stats check 🔢

Cloudflare worker function to update github bio automatically with leetcode and codeforces profile stats 🚀

## How it works

I run a CRON Job ⌚ every 30 minutes and update my github bio with my current codeforces rating and leetcode stats.

You can also use it by adding your own config file 🔧 with the following information:

1. Github PAT token with permissions for modifying user data.
2. Codeforces username.
3. Leetcode username.
