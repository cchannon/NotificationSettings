// class for holding user's opt-ins
export class myOptIn {
    name: string;
    type: string;
}

// class for controlling the state of each section item
export class settingSection {
    key: string;
    title: string;
    description: string;
}

// class for controlling the selection state of checkboxes
export class settingSelection {
    valid: boolean;
    checked: boolean;
    disabled: boolean;
}

// class for controlling the state of each setting item
export class settingItem {
    key: string;
    section: string;
    text: string;
    email: settingSelection;
    push: settingSelection;
    inapp: settingSelection;
}
