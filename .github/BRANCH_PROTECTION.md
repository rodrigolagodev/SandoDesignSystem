# Branch Protection Configuration

This document describes how to configure branch protection rules for the Sando Design System repository to enforce GitHub Flow.

## Purpose

Branch protection ensures:

- **Master is always deployable** - Only tested, reviewed code reaches production
- **Quality gates enforced** - CI checks must pass before merge
- **Conscious review** - Auto-review forces deliberate inspection of changes
- **Clean repository** - Auto-delete branches after merge

## Configuration Steps

### 1. Navigate to Branch Protection Settings

1. Go to your repository on GitHub: `https://github.com/rodrigolagodev/sandodesignsystem`
2. Click **Settings** (top navigation)
3. Click **Branches** (left sidebar under "Code and automation")
4. Under "Branch protection rules", click **Add rule**

### 2. Configure Protection for `master` Branch

**Branch name pattern**: `master`

Enable the following settings:

#### Require a pull request before merging

- ✅ **Require a pull request before merging**
  - **Required number of approvals before merging**: `1`
    - ✅ **Dismiss stale pull request approvals when new commits are pushed**
    - ❌ **Require review from Code Owners** (not needed for solo developer)
    - ❌ **Restrict who can dismiss pull request reviews** (not needed)
    - ❌ **Allow specified actors to bypass required pull requests** (not needed)
  - ❌ **Require approval of the most recent reviewable push** (optional)

#### Require status checks to pass before merging

- ✅ **Require status checks to pass before merging**
  - ✅ **Require branches to be up to date before merging**
  - **Status checks that are required** (add after first PR runs):
    - `test (Node 20.x)` - Unit + E2E + A11y tests
    - `lint (ESLint + Prettier)` - Code quality
    - `build (All Packages)` - Build verification
    - `PR Validation Summary` - Overall validation status

  > **Note**: Status checks will appear in the list after the first PR runs the workflows. You'll need to come back and add them after creating your first PR.

#### Other settings

- ✅ **Require conversation resolution before merging**
  - Forces all review comments to be resolved before merge

- ❌ **Require signed commits** (optional - adds complexity)

- ❌ **Require linear history**
  - Allow merge commits for Changesets version PRs
  - Squash and merge is default for feature PRs

- ❌ **Require deployments to succeed before merging** (not needed)

- ❌ **Lock branch** (don't lock)

- ❌ **Do not allow bypassing the above settings**
  - Leave unchecked to allow admin bypass in emergencies

#### Rules applied to administrators

- ❌ **Include administrators**
  - Allow admins to bypass in emergencies (hotfixes, urgent security patches)

#### Restrict pushes/deletions

- ❌ **Restrict who can push to matching branches** (not needed for solo dev)

- ✅ **Allow force pushes** → **Disable**
  - Prevents force-push to master (preserves history)

- ✅ **Allow deletions** → **Disable**
  - Prevents accidental master branch deletion

### 3. Enable Auto-delete Branches

1. Go to **Settings** → **General**
2. Scroll down to **Pull Requests**
3. Enable: ✅ **Automatically delete head branches**

This ensures feature branches are deleted immediately after merge (keeps repository clean).

## Verification

After configuration, verify the setup:

### Test 1: Direct Push Blocked

```bash
git checkout master
git commit --allow-empty -m "test: verify branch protection"
git push
```

**Expected**: ❌ Push rejected with message "required status checks"

### Test 2: PR Required

```bash
git checkout -b test/branch-protection
git commit --allow-empty -m "test: verify PR workflow"
git push -u origin test/branch-protection
```

Then create a PR on GitHub.

**Expected**:

- ✅ CI workflows run automatically
- ✅ "Merge" button disabled until checks pass
- ✅ "Merge" button disabled until approval

### Test 3: Status Checks Enforced

Create a PR with failing tests:

```typescript
// Intentionally break a test
test("failing test", () => {
  expect(true).toBe(false);
});
```

**Expected**:

- ❌ "test" check fails
- ❌ Cannot merge PR
- ✅ Fix test → check passes → can merge

### Test 4: Auto-delete Works

After merging a PR:

**Expected**:

- ✅ Branch deleted automatically
- ✅ GitHub shows "Branch was deleted"

## Troubleshooting

### Status checks not appearing

**Problem**: Status checks don't show in "Required status checks" list

**Solution**:

1. Create and push a test branch
2. Open a PR (triggers workflows)
3. Wait for workflows to complete
4. Return to branch protection settings
5. Status check names will now appear in the search box

### Cannot merge own PR

**Problem**: "1 approval required" but you're the only developer

**Solution**: This is intentional - approve your own PR to force conscious review:

1. Review the diff carefully
2. Check all tests pass
3. Click "Approve" on your own PR
4. Then merge

This "auto-review" pattern ensures you consciously inspect changes before deployment.

### CI failing on first PR

**Problem**: First PR fails because husky hooks not installed

**Solution**:

```bash
# Install husky hooks
pnpm prepare

# This creates .husky/_ directory
# Commit .husky/pre-commit and .husky/commit-msg
```

## Configuration Summary

**Branch**: `master`

| Setting                 | Value                   | Reason                             |
| ----------------------- | ----------------------- | ---------------------------------- |
| Require PR              | ✅ Yes (1 approval)     | Forces conscious review            |
| Required checks         | `test`, `lint`, `build` | Ensures quality gates              |
| Conversation resolution | ✅ Yes                  | Forces addressing feedback         |
| Linear history          | ❌ No                   | Allow merge commits for Changesets |
| Force push              | ❌ Disabled             | Preserve history                   |
| Delete branch           | ❌ Disabled             | Prevent accidents                  |
| Enforce for admins      | ❌ No                   | Allow emergency bypass             |
| Auto-delete head        | ✅ Yes                  | Keep repo clean                    |

## Updating Configuration

If you need to modify branch protection:

1. Go to **Settings** → **Branches**
2. Find "master" rule
3. Click **Edit**
4. Make changes
5. Click **Save changes**

Document any changes in this file and commit to repository.

## References

- [GitHub Flow Principles](../.claude/guidelines/03-development/GIT_WORKFLOW.md#github-flow-principles)
- [GitHub Docs - Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [PR Validation Workflow](./workflows/pr.yml)
- [Release Workflow](./workflows/release.yml)

---

**Last Updated**: 2025-11-04
**Version**: 1.0.0
**Owner**: DevOps Automation Engineer
