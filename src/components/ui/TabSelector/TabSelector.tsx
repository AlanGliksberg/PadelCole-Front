import React from "react";
import { View, Pressable } from "react-native";
import CustomText from "../CustomText/CustomText";
import { styles } from "./TabSelector.styles";

interface Tab<T extends string> {
  id: T;
  label: string;
}

interface TabSelectorProps<T extends string> {
  tabs: readonly Tab<T>[];
  selectedTab: T;
  onTabChange: (tabId: T) => void;
}

export const TabSelector = <T extends string>({
  tabs,
  selectedTab,
  onTabChange,
}: TabSelectorProps<T>) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <React.Fragment key={tab.id}>
          <Pressable
            onPress={() => onTabChange(tab.id)}
            style={[styles.tab, selectedTab === tab.id && styles.tabSelected]}
          >
            <CustomText
              style={[
                styles.tabText,
                selectedTab === tab.id && styles.tabTextSelected,
              ]}
              type="body"
              bold
            >
              {tab.label}
            </CustomText>
          </Pressable>
          {index < tabs.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
};
