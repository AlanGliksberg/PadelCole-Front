import useCategories from "@/src/hooks/useCategories";
import useGenders from "@/src/hooks/useGenders";
import usePositions from "@/src/hooks/usePositions";
import { colors } from "@/src/theme";
import { Category } from "@/src/types";
import { GENDER_CODE } from "@/src/types/player/Gender";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomText from "../ui/CustomText/CustomText";
import FullButton from "../ui/FullButton/FullButton";
import SimpleButton from "../ui/SimpleButton/SimpleButton";
import { styles } from "./FiltersModal.styles";
import CustomModalView from "../Modals/CustomModalView";

interface FiltersModalProps {
  visible: boolean;
  selectedGenders: string[];
  selectedPositions: string[];
  selectedCategories: string[];
  onToggleGender: (id: string) => void;
  onTogglePosition: (id: string) => void;
  onToggleCategory: (id: string) => void;
  onApply: () => void;
  onCancel: () => void;
  resetFilters: () => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  visible,
  selectedGenders,
  selectedPositions,
  selectedCategories,
  onToggleGender,
  onTogglePosition,
  onToggleCategory,
  onApply,
  onCancel,
  resetFilters,
}) => {
  const { data: genders, loading: lg } = useGenders(true);
  const { data: positions, loading: lp } = usePositions();
  const { data: categories, loading: lc } = useCategories(true);
  const loading = lg || lp || lc;

  const maleGender = genders.find((g) => g.code === GENDER_CODE.CABALLERO);
  const femaleGender = genders.find((g) => g.code === GENDER_CODE.DAMA);
  const maleId = maleGender?.id;
  const femaleId = femaleGender?.id;

  const shownCategories =
    selectedGenders.length > 0
      ? categories.filter((c) =>
          selectedGenders.includes(
            c.genderId === maleId ? GENDER_CODE.CABALLERO : GENDER_CODE.DAMA
          )
        )
      : categories;

  const maleCats =
    maleId != null ? shownCategories.filter((c) => c.genderId === maleId) : [];
  const femaleCats =
    femaleId != null
      ? shownCategories.filter((c) => c.genderId === femaleId)
      : [];

  const mSorted = [...maleCats].sort((a, b) => a.code.localeCompare(b.code));
  const fSorted = [...femaleCats].sort((a, b) => a.code.localeCompare(b.code));

  let firstColumn = [] as Category[];
  let secondColumn = [] as Category[];

  if (selectedGenders.length === 1) {
    if (selectedGenders[0] === GENDER_CODE.DAMA) {
      firstColumn = fSorted;
    } else {
      firstColumn = mSorted;
    }
  } else {
    firstColumn = fSorted;
    secondColumn = mSorted;
  }

  return (
    <CustomModalView
      visible={visible}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              <View style={styles.header}>
                <CustomText bold type="h2" style={{ color: colors.primary }}>
                  Filtros
                </CustomText>
                <TouchableOpacity onPress={onCancel} style={styles.closeBtn}>
                  <MaterialIcons
                    name="close"
                    size={24}
                    color={colors.placeholder}
                  />
                </TouchableOpacity>
              </View>

              {loading ? (
                <ActivityIndicator size="large" color={colors.primary} />
              ) : (
                <>
                  <CustomText bold style={styles.label}>
                    Género
                  </CustomText>
                  <View style={styles.toggleRow}>
                    {genders.map((g) => {
                      const active = selectedGenders.includes(g.code);
                      return (
                        <TouchableOpacity
                          key={g.id}
                          style={[
                            styles.toggleBtn,
                            active && styles.toggleActive,
                          ]}
                          onPress={() => onToggleGender(g.code)}
                          activeOpacity={0.7}
                        >
                          <CustomText
                            style={active ? styles.textActive : styles.text}
                            type="medium"
                          >
                            {g.name}
                          </CustomText>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <CustomText bold style={styles.label}>
                    Posición
                  </CustomText>
                  <View style={styles.toggleRow}>
                    {positions.map((p) => {
                      const active = selectedPositions.includes(p.code);
                      return (
                        <TouchableOpacity
                          key={p.id}
                          style={[
                            styles.toggleBtn,
                            active && styles.toggleActive,
                          ]}
                          onPress={() => onTogglePosition(p.code)}
                          activeOpacity={0.7}
                        >
                          <CustomText
                            style={active ? styles.textActive : styles.text}
                            type="medium"
                          >
                            {p.description}
                          </CustomText>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <CustomText bold style={styles.label}>
                    Categoría
                  </CustomText>
                  <ScrollView
                    style={styles.categoriesScroll}
                    contentContainerStyle={styles.categoryContainer}
                    showsVerticalScrollIndicator
                    persistentScrollbar
                  >
                    <View style={styles.categoryColumn}>
                      {firstColumn.map((c) => {
                        const sel = selectedCategories.includes(c.code);
                        return (
                          <TouchableOpacity
                            key={c.id}
                            style={styles.levelItem}
                            onPress={() => onToggleCategory(c.code)}
                            activeOpacity={0.7}
                          >
                            <MaterialIcons
                              name={
                                sel ? "check-box" : "check-box-outline-blank"
                              }
                              size={24}
                              color={sel ? colors.primary : colors.placeholder}
                            />
                            <CustomText style={styles.levelText} type="h4">
                              {c.code}
                            </CustomText>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <View style={styles.categoryColumn}>
                      {secondColumn.map((c) => {
                        const sel = selectedCategories.includes(c.code);
                        return (
                          <TouchableOpacity
                            key={c.id}
                            style={styles.levelItem}
                            onPress={() => onToggleCategory(c.code)}
                            activeOpacity={0.7}
                          >
                            <MaterialIcons
                              name={
                                sel ? "check-box" : "check-box-outline-blank"
                              }
                              size={24}
                              color={sel ? colors.primary : colors.placeholder}
                            />
                            <CustomText style={styles.levelText} type="h4">
                              {c.code}
                            </CustomText>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>

                  <View style={styles.actions}>
                    <SimpleButton
                      title="Restablecer"
                      onPress={resetFilters}
                      size="l"
                    />
                    <FullButton onPress={onApply} size="s">
                      <CustomText.ButtonText type="small">
                        Aplicar
                      </CustomText.ButtonText>
                    </FullButton>
                  </View>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </CustomModalView>
  );
};

export default FiltersModal;
