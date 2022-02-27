<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="(val) => (notes = val)"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curBook.id">请创建笔记本后</div>
      <div class="note-empty" v-show="!curNote.id">选择或创建笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <div class="note-bar-time">
            <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
            <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
          </div>
          <span> {{ statusText }}</span>
          <div class="note-bar-btn">
            <span @click="isShowPreview = !isShowPreview"
              ><svg class="icon" aria-hidden="true">
                <use
                  v-bind:xlink:href="
                    isShowPreview ? '#icon-yulan' : '#icon-bianji'
                  "
                ></use></svg
              >输入/预览</span
            >
            <span @click="onDeleteNote"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-delete"></use></svg
              >放入回收站</span
            >
          </div>
        </div>
        <div class="note-title">
          <input
            type="text"
            v-model="curNote.title"
            @input="onUpdateNote"
            @keydown="statusText = '正在输入...'"
            placeholder="输入标题"
          />
        </div>
        <div class="editor">
          <textarea
            v-show="isShowPreview"
            v-model="curNote.content"
            @input="onUpdateNote"
            @keydown="statusText = '正在输入...'"
            placeholder="输入内容, 支持 markdown 语法"
          ></textarea>
          <div
            class="preview markdown-body"
            v-html="previewContent"
            v-show="!isShowPreview"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import MarkdownIt from "markdown-it";
import NoteSidebar from "./NoteSidebar.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

let md = new MarkdownIt();
export default {
  components: {
    NoteSidebar,
  },

  data() {
    return {
      statusText: "笔记未改动",
      isShowPreview: false,
    };
  },

  created() {
    this.checkLogin({ path: "/login" });
  },

  computed: {
    ...mapGetters(["notes", "curNote", "curBook"]),

    previewContent() {
      return md.render(this.curNote.content || "");
    },
  },

  methods: {
    ...mapMutations(["setCurNote"]),

    ...mapActions(["updateNote", "deleteNote", "checkLogin"]),

    onUpdateNote: _.debounce(function () {
      if (!this.curNote.id) return;
      this.updateNote({
        noteId: this.curNote.id,
        title: this.curNote.title,
        content: this.curNote.content,
      })
        .then(() => {
          this.statusText = "已保存";
        })
        .catch(() => {
          this.statusText = "保存出错";
        });
    }, 300),

    onDeleteNote() {
      this.deleteNote({ noteId: this.curNote.id }).then(() => {
        this.$router.replace({ path: "/note" });
      });
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurNote({ curNoteId: to.query.noteId });
    next();
  },
};
</script>

<style scoped>
@import "~@/assets/css/note-detail.css";
</style>
