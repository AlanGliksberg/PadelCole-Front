import React, { useState } from "react";
import { View, Pressable } from "react-native";
import CustomText from "../CustomText/CustomText";
import { styles } from "./TabSelector.styles";

interface Tab {
  id: string;
  label: string;
  component: React.ReactNode;
}

interface TabSelectorProps {
  tabs: readonly Tab[];
}

export const TabSelector = ({ tabs }: TabSelectorProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].id);
  const selectedTabData = tabs.find((tab) => tab.id === selectedTab)!;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            <Pressable
              onPress={() => setSelectedTab(tab.id)}
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

      <View style={styles.content}>{selectedTabData.component}</View>
    </View>
  );
};
