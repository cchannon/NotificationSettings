import * as React from "react";
import {
  FluentProvider,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Text,
  Checkbox,
  webLightTheme,
  Button,
  CheckboxOnChangeData,
} from "@fluentui/react-components";
import { Stack, StackItem } from "@fluentui/react";
import { settingSection, settingItem, myOptIn } from "./models";

// Interface for NotificationSettings component props
export interface INotificationSettingsProps {
  dataset: ComponentFramework.PropertyTypes.DataSet;
  webApi: ComponentFramework.WebApi;
  userId: string;
  clientUrl: string;
}

// #region DEMO DATA
const categories = [
  {
    key: "1",
    title: "Category 1",
    description: "Description 1",
  },
  {
    key: "2",
    title: "Category 2",
    description: "Description 2",
  },
  {
    key: "3",
    title: "Category 3",
    description: "Description 3",
  }
]

const Notifications: settingItem[] = [
  {
    key: "4",
    section: "1",
    text: "Notification 1",
    email: {
      valid: true,
      checked: false,
      disabled: false,
    },
    inapp: {
      valid: true,
      checked: true,
      disabled: true,
    },
    push: {
      valid: true,
      checked: true,
      disabled: false,
    },
  },
  {
    key: "5",
    section: "1",
    text: "Notification 2",
    email: {
      valid: true,
      checked: true,
      disabled: false,
    },
    inapp: {
      valid: true,
      checked: false,
      disabled: false,
    },
    push: {
      valid: true,
      checked: true,
      disabled: false,
    },
  },
  {
    key: "6",
    section: "2",
    text: "Notification 3",
    email: {
      valid: true,
      checked: true,
      disabled: false,
    },
    inapp: {
      valid: true,
      checked: true,
      disabled: false,
    },
    push: {
      valid: true,
      checked: true,
      disabled: false,
    },
  },
  {
    key: "7",
    section: "2",
    text: "Notification 4",
    email: {
      valid: true,
      checked: true,
      disabled: true,
    },
    inapp: {
      valid: true,
      checked: true,
      disabled: false,
    },
    push: {
      valid: true,
      checked: false,
      disabled: false,
    },
  },
  {
    key: "8",
    section: "3",
    text: "Notification 5",
    email: {
      valid: true,
      checked: true,
      disabled: true,
    },
    inapp: {
      valid: true,
      checked: true,
      disabled: true,
    },
    push: {
      valid: true,
      checked: true,
      disabled: true,
    },
  }
]
// #endregion

export const Settings: React.FC<INotificationSettingsProps> = (
  props: INotificationSettingsProps
) => {
  const [sections, setSections] = React.useState<settingSection[]>(categories);
  const [items, setItems] = React.useState<settingItem[]>(Notifications);
  const [expandedItems, setExpandedItems] = React.useState<any[]>([]);
  const [hasUncategorized, setHasUncategorized] = React.useState<boolean>(false);
  const [myOptIns, setMyOptIns] = React.useState<myOptIn[]>([]);
  const [hover, setHover] = React.useState<string>("");

  // Run on update of userId to  list opt-ins for the user
  // React.useEffect(() => {
  //   //get "my opt ins" from the N:N Intersect Entity
  //   let fetch = '<fetch top="100"><entity name="<opt-in table name>"><attribute name="<opt-in table name column>" /><attribute name="<opt-in table notification type>" />';
  //   fetch += '<link-entity name="<N:N intersect table bridge to User>" from="<fromcol ref>" to="<tocol ref>" link-type="inner" alias="user" intersect="true">';
  //   fetch += '<filter><condition attribute="systemuserid" operator="eq" value="';
  //   fetch += props.userId.slice(1, -1);
  //   fetch += '" /></filter></link-entity></entity></fetch>';
  //   props.webApi
  //     .retrieveMultipleRecords(
  //       "<opt-in table name>",
  //       `?fetchXml=${fetch}`
  //     )
  //     .then(
  //       (results) => {
  //         setMyOptIns(
  //           results.entities.map((ent) => {
  //             return {
  //               name: ent.lmco_name,
  //               type: (ent.lmco_notificationtype as number).toString(),
  //             } as myOptIn;
  //           })
  //         );
  //       },
  //       (error) => console.error(error.message)
  //     );
  // }, [props.userId, props.dataset]);

  // Run on init or if setItems designates the presence of an Uncategorized item.
  // Retrieve all notification categories and create a section for each
  // React.useEffect(() => {
  //   props.webApi
  //     .retrieveMultipleRecords(
  //       "<notification category table name>",
  //       "?$select=<notification category name>,<notification category description>&$orderby=<sortorder column> asc"
  //     )
  //     .then(
  //       (success) => {
  //         setSections(
  //           success.entities.map((ent) => {
  //             return {
  //               key: ent.<notification category id>,
  //               title: ent.<notification category name>,
  //               description: ent.<notification description>??"",
  //             } as settingSection;
  //           })
  //         );
  //         if (hasUncategorized) {
  //           setSections((sections) => {
  //             return [
  //               ...sections,
  //               {
  //                 key: "uncategorized",
  //                 title: "Uncategorized",
  //                 description: "",
  //               } as settingSection,
  //             ];
  //           });
  //         }
  //       },
  //       (error) => {
  //         console.error(error.message);
  //       }
  //     );
  // }, [hasUncategorized]);

  // Run on init or if the sections state changes.
  React.useEffect(() => {
    setExpandedItems(sections.map((section) => section.key));
  }, [sections]);

  // Run on init or if the dataset changes or if myOptIns change.
  // get distinct settings definitions, get user's opt-ins, and set items
  // React.useEffect(() => {
  //   const distinctNotifications = props.dataset.sortedRecordIds.reduce<String[]>((unique, id) => {
  //     const text = props.dataset.records[id].getFormattedValue("<notification name>");
  //     return unique.includes(text) ? unique : [...unique, text];
  //   }, []);

  //   //build out a list of settings as settingItem[]
  //   const settings = distinctNotifications.map((text) => {
  //     let matches = props.dataset.sortedRecordIds.filter((id) => {
  //       return (
  //         props.dataset.records[id].getFormattedValue("<notification name>") === text
  //       );
  //     });
  //     return {
  //       key: text,
  //       section:
  //         (
  //           props.dataset.records[matches[0]].getValue(
  //             "<notification category lookup>"
  //           ) as ComponentFramework.EntityReference
  //         )?.id?.guid ?? "uncategorized",
  //       text: text,
  //       email: {
  //         valid: matches.some((id) => {
  //           return (props.dataset.records[id].getValue("<notification type>") === "504890000")
  //         }),
  //         checked: myOptIns.some((opt) => {
  //           return (opt.name === text && opt.type === "504890000");
  //         }),
  //         disabled:
  //           matches.some((id) => {
  //             return (props.dataset.records[id].getValue("<admin control flag>") === "1"
  //               && props.dataset.records[id].getValue("<notification type>") === "504890000"
  //           )}),
  //       },
  //       inapp: {
  //         valid: matches.some((id) => {
  //           return (props.dataset.records[id].getValue("<notification type>") === "504890001")
  //         }),
  //         checked: myOptIns.some((opt) => {
  //           return opt.name === text && opt.type === "504890001";
  //         }),
  //         disabled:
  //         matches.some((id) => {
  //           return (props.dataset.records[id].getValue("<admin control flag>") === "1"
  //             && props.dataset.records[id].getValue("<notification type>") === "504890001"
  //         )}),
  //       },
  //       push: {
  //         valid: matches.some((id) => {
  //           return (props.dataset.records[id].getValue("<notification type>") === "504890002")
  //         }),
  //         checked: myOptIns.some((opt) => {
  //           return opt.name === text && opt.type === "504890002";
  //         }),
  //         disabled:
  //           matches.some((id) => {
  //             return (props.dataset.records[id].getValue("<admin control flag>") === "1"
  //               && props.dataset.records[id].getValue("<notification type>") === "504890002"
  //           )}),
  //       }
  //     } as settingItem;
  //   });

  //   //if there are any uncategorized items, set the hasUncategorized flag to trigger rerender of Sections
  //   if (settings.some((setting) => setting.section === "uncategorized")) {
  //     setHasUncategorized(true);
  //   }

  //   setItems(settings);
  // }, [props.dataset, myOptIns]);

  // expand all sections on button click
  function expandAll() {
    setExpandedItems(
      sections.map((section) => {
        return section.key;
      })
    );
  }

  // collapse all sections on button click
  function collapseAll() {
    setExpandedItems([]);
  }

  // onCheck function for checkboxes:
  // if item is Checked, disassociate the user and opt-in.
  // if item is not Checked, associate the user and opt-in.
  function onCheck(
    ev: React.ChangeEvent<HTMLInputElement>,
    data: CheckboxOnChangeData,
    item: settingItem,
    type: string
  ) {
    // console.log(type);
    // //Find the opt-in record
    // props.webApi
    //   .retrieveMultipleRecords(
    //     "<opt-in table>",
    //     "?$select=<opt-in id>&$filter=(<opt-in name> eq '" +
    //       item.text +
    //       "' and <notification type> eq " +
    //       (type === "email"
    //         ? 504890000
    //         : type === "inapp"
    //         ? 504890001
    //         : 504890002) +
    //       ")"
    //   )
    //   .then((result) => {
    //     if (
    //       //if the appropriate type is checked in items
    //       (type === "email" && item.email.checked) ||
    //       (type === "inapp" && item.inapp.checked) ||
    //       (type === "push" && item.push.checked)
    //     ) {
    //       //disassociate the user from the opt-in record
    //       window.fetch(
    //         `${props.clientUrl}/api/data/v9.1/<opt-in table set name>(${
    //           result.entities[0].<opt-in id>
    //         })/<opt-in--system user intersect table name>(${props.userId.slice(1,-1)})/$ref`,
    //         {
    //           method: "DELETE",
    //           headers: {
    //             "Content-Type": "application/json; charset=utf-8",
    //             Accept: "application/json",
    //             "OData-MaxVersion": "4.0",
    //             "OData-Version": "4.0",
    //           },
    //         }
    //       );
    //     } else {
    //       //associate the user to the opt-in record
    //       const payload = {
    //         "@odata.id": `${props.clientUrl}/api/data/v9.1/<opt-in table set name>(${result.entities[0].<opt-in id>})`,
    //       };

    //       window.fetch(
    //         `${props.clientUrl}/api/data/v9.1/systemusers(${props.userId.slice(1,-1)})/<opt-in--system user intersect table name>/$ref`,
    //         {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json; charset=utf-8",
    //             Accept: "application/json",
    //             "OData-MaxVersion": "4.0",
    //             "OData-Version": "4.0",
    //           },
    //           body: JSON.stringify(payload),
    //         }
    //       );
    //     }
    //  });
  }

  return (
    //instantiating the FluentProvider with the webLightTheme
    <FluentProvider theme={webLightTheme} style={{ width: "100%" }}>
      <Stack tokens={{ childrenGap: 5 }} style={{ width: "100%" }}>
        <Stack
          horizontal
          tokens={{ childrenGap: 10 }}
          style={{ width: "100%", textAlign: "end" }}
        >
          {/* Expand / Collapse buttons */}
          <StackItem grow={3} align="end">
            <Button appearance="subtle" onClick={expandAll}>
              + Expand All
            </Button>
          </StackItem>
          <StackItem>
            <Button appearance="subtle" onClick={collapseAll}>
              - Collapse All
            </Button>
          </StackItem>
        </Stack>
        {/* Accordion with custom openItems and onToggle props to control expanded items in state*/}
        <Accordion
          multiple={true}
          collapsible={true}
          navigation={"linear"}
          openItems={expandedItems}
          onToggle={(_, data) => {
            setExpandedItems(() => {
              const value = (data as any).value;
              if (expandedItems.includes(value)) {
                return expandedItems.filter((item) => item !== value);
              } else {
                return [...expandedItems, value];
              }
            });
          }}
        >
          {/* Sections as a map function of the Sections state obj */}
          {sections.map((section) => {
            return (
              <AccordionItem
                key={section.key}
                value={section.key}
                style={{
                  backgroundColor: section.key === hover ? "#DEE6F0" : "#EBF3FC",
                }}
              >
                <AccordionHeader expandIconPosition="end" size="large">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      marginLeft: "10px",
                      marginTop: "5px",
                    }}
                    onMouseEnter={() => {
                      setHover(section.key)
                    }}
                    onMouseLeave={() => {
                      setHover("")
                    }}
                  >
                    <h3>{section.title}</h3>
                    <p style={{ marginTop: 5, marginBottom: 10 }}>
                    {section.description}
                  </p>
                  </div>
                </AccordionHeader>
                {/* Accordion Panels as a map function of the Items state obj */}
                {items
                  .filter((item) => item.section === section.key)
                  .map((item) => {
                    return (
                      <AccordionPanel
                        style={{ marginLeft: 0, marginRight: 0 }}
                        key={item.key}
                      >
                        <Stack
                          horizontal
                          tokens={{ childrenGap: 10 }}
                          style={{
                            backgroundColor: item.key === hover ? "#EBEBEB" : "white",
                          }}
                          onMouseEnter={() => {
                            setHover(item.key)
                          }}
                          onMouseLeave={() => {
                            setHover("")
                          }}
                        >
                          {/* Individual panel rows with checkboxes */}
                          <StackItem grow={3}>
                            <Text
                              size={400}
                              weight={"semibold"}
                              style={{
                                marginTop: 10,
                                marginBottom: 10,
                                marginLeft: 52,
                              }}
                            >
                              {item.text}
                            </Text>
                          </StackItem>
                          {item.email.valid && (
                            <Checkbox
                              label={"Email Notification"}
                              defaultChecked={item.email.checked}
                              disabled={item.email.disabled}
                              onChange={(
                                ev: React.ChangeEvent<HTMLInputElement>,
                                data: CheckboxOnChangeData
                              ) => onCheck(ev, data, item, "email")}
                            />
                          )}
                          {item.inapp.valid && (
                            <Checkbox
                              label={"In-App Notification"}
                              defaultChecked={item.inapp.checked}
                              disabled={item.inapp.disabled}
                              onChange={(
                                ev: React.ChangeEvent<HTMLInputElement>,
                                data: CheckboxOnChangeData
                              ) => onCheck(ev, data, item, "inapp")}
                            />
                          )}
                          {item.push.valid && (
                            <Checkbox
                              label={"Mobile Push Notification"}
                              defaultChecked={item.push.checked}
                              disabled={item.push.disabled}
                              onChange={(
                                ev: React.ChangeEvent<HTMLInputElement>,
                                data: CheckboxOnChangeData
                              ) => onCheck(ev, data, item, "push")}
                            />
                          )}
                        </Stack>
                      </AccordionPanel>
                    );
                  })}
              </AccordionItem>
            );
          })}
        </Accordion>
      </Stack>
    </FluentProvider>
  );
};
