import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, Modal, ScrollView, TouchableOpacity, View } from "react-native";

import CustomSelect from "@/src/components/ui/CustomSelect/CustomSelect";
import CustomText from "@/src/components/ui/CustomText/CustomText";
import CustomTextInput from "@/src/components/ui/CustomTextInput/CustomTextInput";
import FullButton from "@/src/components/ui/FullButton/FullButton";
import usePositions from "@/src/hooks/usePositions";
import { Player } from "@/src/types/player/Player";
import { Position } from "@/src/types/player/Position";
import { styles } from "./EditProfileModal.styles";

interface EditProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  player: Player | null;
  onUpdate?: () => void;
}

export default function EditProfileModal({
  isVisible,
  onClose,
  player,
  onUpdate,
}: EditProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const { data: positions } = usePositions();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [positionId, setPositionId] = useState(0);

  useEffect(() => {
    if (player) {
      setFirstName(player.firstName || "");
      setLastName(player.lastName || "");
      setPhone(player.phone || "");
      setPositionId(player.position?.id || 0);
    }
  }, [player]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert("Éxito", "Tu perfil ha sido actualizado correctamente", [
        { text: "OK", onPress: handleClose },
      ]);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "No se pudo actualizar el perfil. Inténtalo de nuevo.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <CustomText style={styles.title}>Editar Perfil</CustomText>
            <TouchableOpacity onPress={handleClose}>
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            <CustomTextInput
              label="Nombre"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Ingresa tu nombre"
            />

            <CustomTextInput
              label="Apellido"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Ingresa tu apellido"
            />

            <CustomTextInput
              label="Teléfono"
              value={phone}
              onChangeText={setPhone}
              placeholder="Ingresa tu teléfono"
              keyboardType="phone-pad"
            />

            {positions && (
              <CustomSelect<Position>
                label="Posición"
                data={positions}
                value={positionId}
                onSelect={setPositionId}
                keyExtractor={(pos: Position) => pos.id.toString()}
                labelExtractor={(pos: Position) => pos.description}
                placeholder="Selecciona tu posición"
              />
            )}
          </ScrollView>

          <View style={styles.footer}>
            <FullButton onPress={onSubmit} disabled={loading}>
              <CustomText
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </CustomText>
            </FullButton>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
