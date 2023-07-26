app.component('product-display', {
	props: {
		premium: {
			type: Boolean,
			required: true,
		},
	},
	template: /*html*/ `<div class="product-display">
				<div class="product-container">
					<div class="product-image">
						<img :src="image" :class="[!inStock ? 'out-of-stock-img' : '']" />
					</div>
					<div class="product-info">
						<h1>{{ title }}</h1>
						<p v-if="inStock">In Stock</p>
						<!-- <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p> -->
						<p v-else>Out of Stock</p>
                        <p>Shipping: {{ shipping }}</p>
						<product-details :details="details"></product-details>
						<p v-if="onSale">{{ isOnSale }}</p>
						<p>{{ description }}</p>
						<div
							v-for="(variant, index) in variants"
							:key="variant.id"
							@mouseover="updateVariant(index)"
							class="color-circle"
							:style="{ backgroundColor: variant.color }"
						></div>
						<p>Sizes available:</p>
						<ul>
							<li v-for="size in sizes">{{ size }}</li>
						</ul>
					</div>

					<button
						class="button"
						:class="{ disabledButton: !inStock }"
						:disabled="!inStock"
						@click="addToCart"
					>
						Add to Cart
					</button>
				</div>
				<review-list v-if="reviews.length" :reviews="reviews"></review-list>
				<review-form @review-submitted="addReview"></review-form>
			</div>`,
	data() {
		return {
			product: 'Socks',
			brand: 'Vue Mastery',
			description: 'Product description',
			selectedVariant: 0,
			details: ['50% cotton', '30% wool', '20% polyester'],
			// inventory: 7,
			onSale: true,
			variants: [
				{
					id: 2234,
					color: 'green',
					image: './assets/images/socks_green.jpg',
					quantity: 50,
				},
				{
					id: 2235,
					color: 'blue',
					image: './assets/images/socks_blue.jpg',
					quantity: 0,
				},
			],
			sizes: ['S', 'M', 'L', 'XL'],
			reviews: [],
		};
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
		},
		updateVariant(index) {
			this.selectedVariant = index;
		},
		addReview(review) {
			this.reviews.push(review);
		},
	},
	computed: {
		title() {
			return this.brand + ' ' + this.product;
		},
		image() {
			return this.variants[this.selectedVariant].image;
		},
		inStock() {
			return this.variants[this.selectedVariant].quantity;
		},
		isOnSale() {
			return this.brand + ' ' + this.product + ' is on sale';
		},
		shipping() {
			if (this.premium) {
				return 'Free';
			}
			return 2.99;
		},
	},
});
