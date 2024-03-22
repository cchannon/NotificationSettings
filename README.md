# NotificationSettings
A basic PCF control for allowing user-management of their own notifications in a Dataverse Application

**Note: This control, as stored in the repo, is NON-FUNCTIONAL. WebAPI calls essential to its operation have been commented out, schemanames from its original implementation have been scrubbed, and TEST DATA is in use instead. Before deploying the code, you must _uncomment_ the WebAPI calls and clientUrl call and convert it to use whatever local schema your notifications are built around (it is also recommended that you remove the test data from the code, for good housekeeping).

## Overview:
This PCF control creates a basic opt-in / opt-out user experience for application notifications, a common scenario in Dataverse Apps. The control was built on pre-existing data structure and could definitely be streamlined. Design and code contributions are welcome! 

The Control allows a user to opt in and out of various notifications at various levels (without any customization, it is pre-set to allow for "email", "in-app", and "push" notifications). Individual notification/notification channel combinations can be locked with an "admin controlled" flag so that users can see the option but cannot change their opt-in status: this is useful when you have Notifications you do NOT want to allow user to opt out of, or ones that are locked to a specific user subset. 

Notifications are grouped into categories, and each category is collapsible as a Fluent V9 Accordion.

The entire control uses virtualized components from Fluent V8 and V9 so it is very quick and efficient to load. 

![demo gif](./assets/notificationsettingsDemo.gif?)

## Recommended Implementation:
I recommend attaching the PCF to a view entirely and setting that view as the default of your Notifications in the left nav. From there, adding it as an IFrame app in Teams is simple, and with the shownavbar QSparam set to False, users will not see any of the app navigation and it will feel like a Teams-embedded notifications management interface (optimal for users who spend minimal time in the app, but still receive notifications from it).

## Contributing
This control is far from optimized, but it is an effective start. If you use this code for your own purposes and make enhancements, I ask that you submit a pull request for review and inclusion in the trunk. Thanks, and happy coding!
