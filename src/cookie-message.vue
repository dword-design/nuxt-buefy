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
  data: () => ({
    hasConsent: true,
  }),
  watch: {
    hasConsent: {
      handler() {
        this.updateBodyPadding()
      },
    },
  },
  mounted() {
    this.hasConsent = !!Cookie.get('cookieConsent')
    window.addEventListener('resize', this.updateBodyPadding)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateBodyPadding)
  },
  methods: {
    openDataPrivacy() {
      return this.$buefy.modal.open({
        component: CardModal,
        props: { inner: Vue.component('DataPrivacy') },
        parent: this,
      })
    },
    consent() {
      Cookie.set('cookieConsent', 1)
      this.hasConsent = true
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
}
</script>
