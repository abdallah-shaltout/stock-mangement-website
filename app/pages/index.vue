<template>
    <section>
        <div class="page-container flex-center flex-col min-h-svh text-center">
            <h1 class="greeting">مرحبًا، {{ AuthStore.user?.name }}!</h1>
            <p class="welcome-message">مرحبًا بك في تطبيقنا الرائع. استمتع بوقتك!</p>

            <NuxtLink :to="{ name: 'dashboard-page' }">
                <Button label="أبدا الأن" size="large" />
            </NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
    const AuthStore = useAuthStore()
</script>

<style scoped>
    .page-container {
        background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
        text-align: center;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        max-width: 90%;
        margin: auto;
    }

    .greeting {
        font-size: 3em;
        color: #333;
        animation:
            fadeIn 2s ease-in-out,
            bounce 2s infinite;
        margin-bottom: 20px;
    }

    .welcome-message {
        font-size: 1.5em;
        color: #666;
        margin-bottom: 30px;
        animation:
            fadeIn 2.5s ease-in-out,
            slideIn 2.5s ease-in-out;
    }

    .cta-button {
        padding: 10px 20px;
        font-size: 1.2em;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        animation: fadeIn 3s ease-in-out;
    }

    .cta-button:hover {
        background-color: #0056b3;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes bounce {
        0%,
        20%,
        50%,
        80%,
        100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-30px);
        }
        60% {
            transform: translateY(-15px);
        }
    }

    @keyframes slideIn {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(0);
        }
    }

    @media (max-width: 768px) {
        .greeting {
            font-size: 2em;
        }

        .welcome-message {
            font-size: 1.2em;
        }

        .cta-button {
            font-size: 1em;
        }
    }

    @media (max-width: 480px) {
        .greeting {
            font-size: 1.5em;
        }

        .welcome-message {
            font-size: 1em;
        }

        .cta-button {
            font-size: 0.8em;
        }
    }
</style>
