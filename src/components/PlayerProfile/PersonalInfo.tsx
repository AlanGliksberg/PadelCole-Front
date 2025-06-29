import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import CustomText from "@/src/components/ui/CustomText/CustomText";
import { colors } from "@/src/theme";
import { Player } from "@/src/types/player/Player";
import { styles } from "./PlayerProfile.styles";

interface PersonalInfoProps {
  player: Player | null;
  onEditProfile: () => void;
}

export default function PersonalInfo({
  player,
  onEditProfile,
}: PersonalInfoProps) {
  return (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <CustomText style={styles.sectionTitle}>Datos Personales</CustomText>
          <TouchableOpacity onPress={onEditProfile}>
            <MaterialIcons name="edit" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <MaterialIcons name="phone" size={20} color={colors.description} />
            <CustomText style={styles.detailText}>
              {player?.phone || "No especificado"}
            </CustomText>
          </View>

          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="account"
              size={20}
              color={colors.description}
            />
            <CustomText style={styles.detailText}>
              {player?.gender?.name || "No especificado"}
            </CustomText>
          </View>

          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="trophy"
              size={20}
              color={colors.description}
            />
            <CustomText style={styles.detailText}>
              {player?.category?.description || "No especificado"}
            </CustomText>
          </View>

          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="hand-pointing-up"
              size={20}
              color={colors.description}
            />
            <CustomText style={styles.detailText}>
              {player?.position?.description || "No especificado"}
            </CustomText>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <CustomText style={styles.sectionTitle}>Preferencias</CustomText>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="calendar"
              size={20}
              color={colors.description}
            />
            <CustomText style={styles.detailText}>
              Días preferidos: Lunes, Miércoles, Viernes
            </CustomText>
          </View>

          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="clock"
              size={20}
              color={colors.description}
            />
            <CustomText style={styles.detailText}>
              Horarios preferidos: 18:00 - 22:00
            </CustomText>
          </View>

          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={colors.description}
            />
            <CustomText style={styles.detailText}>
              Ubicación preferida: Club de Pádel Central
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}
