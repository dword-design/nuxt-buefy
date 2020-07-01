<template>
  <div v-if="!hasConsent" class="cookie-message content">
    <p>{{ $t('Cookie Message') }}</p>
    <div class="level is-mobile">
      <div class="level-left">
        <b-button type="is-link is-small" @click="openDataPrivacy">
          {{ $t('Show details') }}
        </b-button>
      </div>
      <div>
        <b-button type="is-primary is-small" icon-left="check" @click="consent">
          {{ $t('ok') }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import Vue from 'vue'

import CardModal from './card-modal.vue'

export default {
  beforeDestroy() {
    window.removeEventListener('resize', this.updateBodyPadding)
  },
  data: () => ({
    hasConsent: true,
  }),
  methods: {
    consent() {
      Cookie.set('cookieConsent', 1)
      this.hasConsent = true
    },
    openDataPrivacy() {
      return this.$buefy.modal.open({
        component: CardModal,
        parent: this,
        props: { inner: Vue.component('DataPrivacy') },
      })
    },
    updateBodyPadding() {
      if (process.client) {
        this.$nextTick(() => {
          document.body.style.paddingBottom = this.hasConsent
            ? ''
            : `${this.$el.offsetHeight}px`
        })
      }
    },
  },
  mounted() {
    this.hasConsent = !!Cookie.get('cookieConsent')
    window.addEventListener('resize', this.updateBodyPadding)
  },
  watch: {
    hasConsent: {
      handler() {
        this.updateBodyPadding()
      },
    },
  },
}
</script>
