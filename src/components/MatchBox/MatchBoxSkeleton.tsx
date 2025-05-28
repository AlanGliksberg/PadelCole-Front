import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { styles } from "./MatchBoxSkeleton.styles";

/**
 * Skeleton placeholder para MatchBox
 */
const MatchBoxSkeleton: React.FC = () => {
  const opacityAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacityAnim]);

  return (
    <Animated.View style={[styles.card, { opacity: opacityAnim }]}>
      <View style={styles.header}>
        <View style={styles.textBlockLarge} />
        <View style={styles.textBlockSmall} />
      </View>

      <View style={styles.row}>
        <View style={styles.textBlockSmall} />
        <View style={styles.textBlockSmall} />
      </View>

      <View style={styles.row}>
        <View style={styles.tagSkeleton} />
        <View style={styles.tagSkeleton} />
        <View style={styles.tagSkeleton} />
      </View>

      <View style={styles.row}>
        <View style={styles.player} />
        <View style={styles.player} />
        <View style={styles.player} />
        <View style={styles.player} />
      </View>
    </Animated.View>
  );
};

export default MatchBoxSkeleton;
