import { useUsersStore } from "@/stores/users.store";
import type User from "../types/user.interface";

interface ServerResponse {
  status: boolean;
}

class UserService {
  private constructor() {}

  public static get() {
    return {
      fromServer: async (): Promise<void> => {
        for (let i = 0; i !== 5; i++) {
          await useUsersStore().fromServer();
        }
      },
    };
  }

  public static set() {
    return {
      toServer: async (newUser: User): Promise<ServerResponse> => {
        const res: ServerResponse = await useUsersStore().toServer(newUser);

        if (!res.status) {
          alert("Произошла непредвиденная ошибка");
        }

        alert(`Добавлен пользователь: ${newUser.name.first}`);
        return res;
      },

      removeUser(user: User): void {
        useUsersStore().users = useUsersStore().users.filter(
          (obj) => obj.name !== user.name
        );

        alert(`Удалён пользователь: ${user.name.first}`);
      },
    };
  }
}

export { UserService };
