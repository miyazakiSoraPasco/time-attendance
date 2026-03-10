import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authMeApi, loginApi, logoutApi } from "@/api/__generated__/auth/auth"; // Orval生成
import { useAuthStore } from "@/features/auth"; // Zustand store
import { AuthMeSchema } from "@/api/__generated__/zod"; // Zodスキーマ

// React Queryキー管理
export const authQueryKey = {
    all: ["auth"] as const,
    me: () => [...authQueryKey.all, "me"] as const,
};

export const useAuth = () => {
    const queryClient = useQueryClient();

    // 認証ユーザー取得
    const authQuery = useQuery({
        queryKey: authQueryKey.me(),
        queryFn: async () => {
            const data = await authMeApi();
            // Zodで型チェック
            return AuthMeSchema.parse(data);
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        onSuccess: (user) => {
            useAuthStore.getState().setUser(user);
            useAuthStore.getState().setIsAuthenticated(true);
            useAuthStore.getState().setIsInitializing(false);
        },
        onError: () => {
            useAuthStore.getState().setUser(null);
            useAuthStore.getState().setIsAuthenticated(false);
            useAuthStore.getState().setIsInitializing(false);
        },
    });

    // ログイン
    const login = useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const data = await loginApi({ body: credentials });
            return data;
        },
        onSuccess: async () => {
            // ログイン成功後は認証情報を再フェッチ
            await queryClient.invalidateQueries({ queryKey: authQueryKey.me() });
        },
    });

    // ログアウト
    const logout = useMutation({
        mutationFn: logoutApi,
        onSuccess: async () => {
            queryClient.removeQueries({ queryKey: authQueryKey.me() });
            useAuthStore.getState().setUser(null);
            useAuthStore.getState().setIsAuthenticated(false);
        },
    });

    return {
        user: authQuery.data ?? null,
        isAuthenticated: !!authQuery.data,
        isLoading: authQuery.isLoading,
        login,
        logout,
    };
};
