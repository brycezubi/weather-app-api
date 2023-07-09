<script setup>
  import useClima from "../composables/useClima";
  
  const { formartearTemperatura} = useClima()

  defineProps({
    clima:{
      type:Object,
      required:true
    }
  })
</script>
<template>
  <section class="border rounded-md p-8 w-5/6 mx-auto bg-gray-50/60">
    <h2 class="text-2xl text-slate-800 font-bold text-center">Clima : {{clima?.name}}</h2>
    <p class="text-center text-lg text-slate-800 font-semibold">
      Temperatura Actual: {{formartearTemperatura(clima.main?.temp)}}&#8451;
      <span>💦</span>
    </p>
    <div class="flex justify-center gap-8 pt-4">
      <p class="text-amber-200 font-medium text-center">
        Temperatura Minima: {{formartearTemperatura(clima.main?.temp_min)}}&#8451;
        <span>🥶</span>
      </p>
      <p class="text-red-600 font-medium text-center">
        Temperatura Maxima: {{ formartearTemperatura(clima.main?.temp_max) }}&#8451;
        <span>🥵</span>
      </p>
    </div>
  </section>
</template>
