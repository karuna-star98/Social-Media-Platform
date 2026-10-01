# Testing Checklist

Record input, expected output, actual output and status for each case.

| ID | Test | Expected |
|---|---|---|
| TC01 | Valid registration | 201, user returned and JWT issued |
| TC02 | Duplicate email | 409 |
| TC03 | Valid login | 200 and JWT returned |
| TC04 | Invalid login | 401 |
| TC05 | Create post | Post appears at top of feed |
| TC06 | Empty post | 400 validation response |
| TC07 | Add comment | Comment appears |
| TC08 | Like post | Like count increases |
| TC09 | Unlike post | Like count decreases |
| TC10 | Follow user | Following becomes true |
| TC11 | Unfollow user | Following becomes false |
| TC12 | Follow yourself | 400 rejected |
| TC13 | Protected request without token | 401 |
| TC14 | Delete another user's post/comment | 403 |
| TC15 | Responsive layout | Readable at mobile width |
| TC16 | Delete own post | Post disappears and its comments are removed |
| TC17 | Edit profile | Updated name/bio/avatar are visible after reload |
| TC18 | Search user | Matching users appear |
| TC19 | Single post | Post and comments load |
| TC20 | API health | Database state reported |

## Proof Screenshots

Suggested filenames:

- `01-folder-structure.png`
- `02-backend-health.png`
- `03-registration.png`
- `04-login.png`
- `05-home-feed.png`
- `06-create-post.png`
- `07-comments.png`
- `08-like-follow.png`
- `09-profile.png`
- `10-mobile-view.png`
- `11-postman-tests.png`
- `12-mongodb.png`
- `13-github-repository.png`
