<template>
    <form class="w-full" @submit.prevent="addChip(input)">
        <ul
            class="fc flex-wrap gap-2.5 px-4 py-2 main-border rounded-lg"
            v-auto-animate="$autoAnimate"
        >
            <li v-for="(chip, idx) in chips" :key="idx">
                <Button
                    :label="chip"
                    rounded
                    size="small"
                    severity="secondary"
                    class="!px-4"
                    icon="pi pi-times"
                    @click.prevent="removeChip(idx)"
                />
            </li>
            <li>
                <input
                    type="text"
                    class="text-lg focus:!outline-none"
                    v-model="input"
                    placeholder="ريلمي"
                />
            </li>
        </ul>
    </form>
</template>

<script lang="ts" setup>
    const chips = defineModel<string[]>({
        default: []
    })
    const input = ref<string>('')

    function addChip(val: string) {
        if (val.trim()) {
            chips.value.push(val.trim())
            input.value = ''
        }
    }

    watch(
        () => input.value,
        (val) => {
            if (val.includes(',')) {
                addChip(val.replace(',', ''))
            }
        }
    )

    function removeChip(idx: number) {
        chips.value.splice(idx, 1)
    }
</script>
