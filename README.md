# post-prod-suite
adobe cache killer

## Needed

### Setup function that runs on launch

1. Set variables, paths, etc.

### Premiere Prefs Reset to Default Profile

1. Copy current user prefs (keys, layout, etc. not everythgin) to temp location
2. Delete adobe premiere profile
3. copy default profile to create new adobe profile

### After Effects Reset 

1. Remove prefs files - if no directory, create it.
2. Restore prefs files

### Audition Prefs Reset

1. Clear audition files
2. Copy prefs files to location

### Create Startup Project

1. Copy the startup project with overwrite to user desktop

### Remove downloaded EditMate media

1. Once a week - remove all files here: C:\ProgramData\EditMate\Multimedia\
2. Ensure directory still exists empty

### Install Export Presets

1. Make directory for export presets if doesnt exist
2. Copy export presets with overwrite
3. Remove old 'NFL' sequence folder.

### Install Sequence Presets

### Install EditMate Config File

1. Copy config json

### Write log data

1. Write host name, username, & date to db

