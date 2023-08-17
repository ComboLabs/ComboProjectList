# Combo Chain Contract Project List

The Combo Chain contract project list is a list of projects managed by the maintainers of this repo that have been deployed on Combo Chain.

Please note that by adding a project to the list we aren’t making any claims about the project itself; contracts are not reviewed for their quality, merits, or soundness as investments.

## Review process and merge criteria

### Process overview

1. Follow the instructions below to create a PR that would [add your project to the list](#adding-a-project-to-the-list).
2. Wait for a reviewer to kick off the [automated checks](#automated-checks).
3. After the automated checks pass and a reviewer approves the PR, then it will automatically be merged.


## Adding a project to the list

### Create a folder for your project

Create a folder inside of the [data folder](https://github.com/ComboLabs/ComboProjectList/tree/master/data) with the same name as the address of the contract you are trying to add. For example, if you are adding a project with the contract "0x9d695902b43af2eb1ecf069f92eb4eddf8264e0e" you must create a folder called 0x9d695902b43af2eb1ecf069f92eb4eddf8264e0e.


### Create a data file

Add a file to your folder called `data.json` with the following format:

```json
{
  "project_name": "Project Name",
  "project_describe": "a project",
  "contract": {
    "combo": {
      "address": "0x1234123412341234123412341234123412341234"
    }
  }
}
```

#### Per-project overrides

If you require overrides for specific projects, you can include the `overrides` field. You are able to override the `name`, `symbol`, `decimals`, or `bridge` for any project. You do not need to override every project at the same time.

```json
{
  "project_name": "Project Name",
  "project_describe": "a project",
  "contract": {
    "combo": {
      "address": "0x1234123412341234123412341234123412341234",
      "overrides": {
        "project_name": "Project Name2",
        "project_describe": "a project"
      }
    }
  }
}
```


### Create a pull request

Open a [pull request](https://github.com/ComboLabs/ComboProjectList/pulls) with the changes that you've made. Please only add one project per pull request to simplify the review process. This means two new files inside of one new folder. If you want to add multiple projects, please open different PRs for each project.

### Respond to validation checks

Your pull request will be validated by a series of automated checks. If one of these checks fails, please resolve these issues and make sure that validation succeeds. We will review your pull request for final approval once automated validation succeeds.

### Wait for the project list to update automatically

Once your PR is merged, the project list will update automatically to include your project. Please do NOT update the project list (`combo.projectlist.json`) directly. All project list updates will be handled automatically when PRs are merged into the `master` branch.
