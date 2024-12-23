<template>
    <LazySharedSectionGroup title="البيانات الاساسية">
        <template #actions>
            <div class="pending w-24 h-7"></div>
        </template>

        <div class="form-group">
            <form class="form-group">
                <div class="flex-center gap-3">
                    <div class="fl-2 flex-1">
                        <label for="firstName" class="form-label"> الاسم </label>
                        <span id="firstName" class="pending w-full h-10"></span>
                    </div>
                    <div class="fl-2 flex-1">
                        <label for="lastName" class="form-label"> اسم العائلة </label>
                        <span id="lastName" class="pending w-full h-10"></span>
                    </div>
                </div>
                <div class="flex-center flex-col gap-3">
                    <label for="genderInput" class="form-label ml-auto">الجنس</label>
                    <div class="fc gap-2">
                        <span id="genderInput" class="pending mx-auto w-24 h-10"></span>
                        <span id="genderInput" class="pending mx-auto w-24 h-10"></span>
                    </div>
                </div>
                <div class="flex-center gap-3">
                    <div class="fl-2 flex-1">
                        <label for="username" class="form-label"> اسم المستخدم </label>
                        <span id="username" class="pending w-full h-10"></span>
                    </div>
                    <div class="fl-2 flex-1">
                        <label for="phoneNumber" class="form-label"> رقم الهاتف </label>
                        <span id="phoneNumber" class="pending w-full h-10"></span>
                    </div>
                </div>
                <div class="fl-2 flex-1">
                    <label for="email" class="form-label"> البريد الإلكتروني </label>
                    <span id="email" class="pending w-full h-10"></span>
                </div>
            </form>
        </div>
    </LazySharedSectionGroup>
</template>

<script lang="ts" setup></script>

<style></style>
