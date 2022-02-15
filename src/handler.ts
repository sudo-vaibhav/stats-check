import config from './config'
import { Octokit } from '@octokit/core'
const octokit = new Octokit({
  auth: config.githubToken,
})
export async function handleScheduled() {
  const resp: {
    result: { newRating: number }[]
  } = await fetch(
    `https://codeforces.com/api/user.rating?handle=${config.codeforcesHandle}`,
  ).then((r) => r.json())
  const latestRating = resp.result[resp.result.length - 1].newRating

  const leetcodeResponse: {
    data: {
      matchedUser: {
        profile: {
          starRating: number
        }
        submitStats: {
          acSubmissionNum: {
            count: number
          }[]
        }
      }
    }
  } = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationName: 'getUserProfile',
      variables: {
        username: config.leetcodeHandle,
      },
      query: `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          profile{
            starRating
          }
          submitStats{
            acSubmissionNum{
              count
            }
          }
        }
      }
      `,
    }),
  }).then((resp) => resp.json())
  const leetCodeStars = leetcodeResponse.data.matchedUser.profile.starRating
  const leetCodeProblemsSolved =
    leetcodeResponse.data.matchedUser.submitStats.acSubmissionNum[0].count
  const newDescription = `${config.descriptionPrefix}, Rated ${latestRating} on Codeforces, ${leetCodeStars}⭐ on Leetcode (${leetCodeProblemsSolved})`
  await octokit.request('PATCH /user', {
    bio: newDescription,
  })
}
