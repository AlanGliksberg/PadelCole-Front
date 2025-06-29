import { PlayerProfile } from "@/src/components";
import CustomScreen from "@/src/components/ui/CustomScreen/CustomScreen";
import { PERFIL_PAGE_NAME } from "@/src/constants/pages";
import { AuthContext } from "@/src/contexts/AuthContext";
import React, { useContext } from "react";

export default function Perfil() {
  const { user } = useContext(AuthContext);

  return (
    <CustomScreen title={PERFIL_PAGE_NAME}>
      <PlayerProfile playerId={user!.playerId!} />
    </CustomScreen>
  );
}
