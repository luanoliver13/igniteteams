import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { groupsCreate } from "@storage/group/groupsCreate";
import { AppError } from "@utils/AppError";

import { Container, Content, Icon } from "./styles";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Alert } from "react-native";

export function NewGroup() {
  const navigation = useNavigation();
  const [group, setGroup] = useState("");

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo grupo", "Informe o nome da turma.");
      }

      await groupsCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo.");
      }
      console.error(error);
    }
  }

  return (
    <Container>
      <Header showBackButton></Header>

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar pessoas"
        />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
