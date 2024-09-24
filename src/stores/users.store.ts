import { defineStore } from "pinia";

import { type Ref, ref } from "vue";

import type User from "@/components/users/types/user.interface";

interface ServerResponse {
  status: boolean;
}

export const useUsersStore = defineStore("users", () => {
  const url = "https://randomuser.me/api/";
  const users: Ref<Array<User>> = ref([]);

  const fromServer = async () => {
    try {
      const res = await fetch(url, {
        method: "GET",
      });

      const data = await res.json();

      users.value.push(...data.results);

      return users.value;
    } catch (err) {
      console.log(err);
    }
  };

  const toServer = async (newUser: User): Promise<ServerResponse> => {
    const res: ServerResponse = await new Promise<ServerResponse>((resolve) => {
      setTimeout(() => {
        users.value.push(newUser);

        resolve({
          status: true,
        });
      }, 1000);
    });

    return res;
  };

  return {
    fromServer,
    toServer,
    users,
  };
});
